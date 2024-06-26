import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from 'app/ui/App'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { BrowserRouter } from 'react-router-dom'
import { dimychAge } from './dimich'

const rerenderEntireTree=()=>{
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  )
}
rerenderEntireTree()


// console.log(dimychAge)


if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/ui/App',
    () => {
rerenderEntireTree()
  })
}


/*
Штука, которая позволяет всему приложению полностью не перезагружаться, а подсовывает только какие-то отдельные файлы,
которые изменились называться HOT RELOADING.

1. я создал файл dimich.ts--> export const dimychAge=33(содержимое файла)
2. добавил console.log(dimychAge)-->import { dimychAge } from './dimich'(добавил импорт)
3. Теперь при смене значения dimychAge будет перерисовываться все приложение.
4. Но если добавить в index.tsx код
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./dimich',
    () => {
      console.log(dimychAge)
    })
}
взятый и измененный с https://redux-toolkit.js.org/usage/usage-guide#manual-store-setup.
А именно был изменен режим process.env.NODE_ENV === 'development'
5. Код не смог запустить потому что проблема с типизацией
TS2339: Property hot does not exist on type NodeModule
6. Благодоря подсказке ChatGPT добавил в корень файл с именем custom.d.ts и содержанием:
declare module NodeJS {
  interface Module {
    hot?: {
      accept(path?: string, callback?: () => void): void;
    }
  }
}
7. Далее добавил в package.json -->"include": ["src","custom.d.ts"]
8. Теперь при изменение значения в файле dimich.ts переменной dimychAge перерисовка тодулиста не происходит,
а в console.log выводит новое значение

9. Зачем нужен hot loading
🚩Первое чтобы при изменение UI не изменялся(умирал) state.
10. Создадим функцию rerenderEntireTree и обернем root
11. Первый рендер вызовем автоматически-->rerenderEntireTree()
12. Теперь перепишем файл который будет следить за изменениями в App.tsx и вложенными в него компонентами
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/ui/App',
    () => {
rerenderEntireTree()
  })
}
13. Теперь важный момент при изменение чего-то в App.tsx и вложениях будет запускаться rerenderEntireTree(),
 но store не будет мы его сделаем чуть позже.
 14. Будет происходить перерисовка и пойдут запросы на сервер. Раз сделали перерисовку компонента будет вмонтироваться
 заново. И происходит в useEffect c инициализацией
   useEffect(() => {
    if (demo) {
      return
    }
    debugger
    initializeApp()
  }, [])
15. Происходит вмонтирование и запрашиваются данные. Но при этом компонента не умирает.
16. А так как state не умирает значит он уже содержит какие-то данные которые он получил при первом рендеринге.
И их можно использовать чтобы не делать лишних запросов на сервер(а именно initializeApp()).
17. Перепишем
  useEffect(() => {
    if (demo) {
      return
    }
    debugger
    initializeApp()
  }, [])
на
  useEffect(() => {
    debugger
    if (!isInitialized) {
      initializeApp()
    }
  }, [])
18. Теперь при изменении в App.tsx наше приложение перезагружается, но не идут запросы на инициализацию(initializeApp())
 19. Есть проблема теперь что компоненты которые вложены в App.tsx зависят еще и от store и зависимость ломается.
 20. Основная наша задача избавиться от массовой перезагрузки.
 21. Хотим чтобы store не перерисовывался полностью, а подменялась только та часть что изменилась(replaceReducer).
22. Store зависит от редюсеров которые в него приходят authSlice, appSlice, tasksSlice, todolistsSlice. Из-за того что
они поменялись у нас перезапускается весь файл и пересоздается store. По этому додайте вынесем создание рутового
редюсера в отдельный файл.
23. И теперь cоздадим hot reloading в store. Если произошли измененеия в reducers.ts то перерисуем store не полностью,
а динамически (на лету).
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers',
    () => {
      store.replaceReducer(rootReducer)
    })
}
// replaceReducer позволяет заменять основной редюсер на лету(динамически)
24. Компонента вмонтируется и происходит запрос за данными (todolists,tasks) наша задача отменить этот процесс.
25. Идем в TodolistsList.tsx и меняем useEffect, что если у нас нет todolists(todolists.length) то сделай запрос
на сервер:
  useEffect(() => {
    if (!isLoggedIn || demo) {
      return
    }
    // fetchTodolists()
    if(!todolists.length) {
      fetchTodolists()
    }
  }, [])
  26. Так как у меня сделано что для каждого todolist подтягиваются свои tasks то у меня больше ничего не нужно делать.
  27. Еще раз вариант с проверкой длины не совсем правильный нужно вводить дополнительное значение в store  которое будет
  сообщать, что todolists пришли в state
  28. Попробуем закомментировать удаление таски в tasksSlice.ts-->
        .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
29. Теперь при удаление task в Network видно что сервер удалил task но в приложении изменений не произошло так как мы
 закомментировали удаление таски и это будет видно в приложение Redux-->tasks/fetchTasks/fulfilled не удалилась.
 Если мы рас комментируем то все заработает и state измениться на лету(динамически) только ту часть что была изменена.
 Это очень удобно при написание редюсеров.
30. Преимущество всего этого что state не переизбирается заново и данные которые приходят не backend не потереться.
А так же нет лишних перерисовок.






 */


