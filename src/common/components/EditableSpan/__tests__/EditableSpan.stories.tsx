import type { Meta, StoryObj } from '@storybook/react'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
// import EditableSpan from 'common/components/EditableSpan/EditableSpan'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callBack: {
      description: 'Value EditableSpan changed123',
      action: 'clicked',
    },
    title: {
      description: 'Start value empty. Add value push button set string.',
    },
  },
  args: {
    title: 'NewTitle',
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanStory: Story = {
  args: {
    // callBack: action('Value EditableSpan changed')
  },
}
export const EditableSpanDisabledStory: Story = {
  args: {
    // callBack: action('Value EditableSpan changed')
    disabled: true,
  },
}
