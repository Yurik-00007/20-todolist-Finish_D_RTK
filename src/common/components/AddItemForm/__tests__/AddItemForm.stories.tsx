import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
// import AddItemForm from 'common/components/AddItemForm/AddItemForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // addItem:{
    //     description:'Button clicked inside form',
    //     action:'clicked'
    // }
  },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {
  args: {
    addItem: action('Button clicked inside form'),
  },
}
export const AddItemFormDisabledStory: Story = {
  args: {
    addItem: action('Button clicked inside form'),
    disabled: true,
  },
}
