import React, { FC } from 'react'
import { VariantEnum } from '@/common/Types'

import Button, { ButtonProps } from '@/components/BaseComponents/Button/Button'

export default {
  component: Button,
  title: 'BaseComponents/Button'
}

interface StoryTemplate extends FC<ButtonProps> {
  args?: Partial<ButtonProps>
}

const Template: StoryTemplate = (args) => <Button {...args} />

export const Run = Template.bind({})
Run.args = {
  children: 'Run',
  variant: VariantEnum.primary,
  disabled: false,
  onClick: () => {
    console.log('Run Button Clicked')
  }
}

export const Delete = Template.bind({})
Delete.args = {
  children: 'Delete',
  variant: VariantEnum.secondary,
  disabled: false,
  onClick: () => {
    console.log('Delete Button Clicked')
  }
}
