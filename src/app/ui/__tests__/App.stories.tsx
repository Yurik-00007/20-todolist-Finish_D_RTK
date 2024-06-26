import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator'
import {App} from 'app/ui/App'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
  title: 'TODOLISTS/App',
  component: App,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
}

export default meta
type Story = StoryObj<typeof App>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
/*
export const AppWithReduxStory: Story = {
    render:()=>
        <Provider store={store}>
            <AppWithState/>
        </Provider>
};
*/

export const AppStory: Story = {
  // render: () => <App demo={true} />,
  render: () => <App />,
}
