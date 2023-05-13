import React, { FC } from 'react'
import { VariantEnum } from '@/common/Types'

import LegendLabel, {
  LegendLabelProps
} from '@/components/BaseComponents/LegendLabel/LegendLabel'

export default {
  component: LegendLabel,
  title: 'BaseComponents/LegendLabel'
}

interface StorybookTemplate extends FC<LegendLabelProps> {
  args?: Partial<LegendLabelProps>
}

const Template: StorybookTemplate = (args) => <LegendLabel {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Name',
  variant: VariantEnum.primary
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Manuel Ferreras',
  variant: VariantEnum.secondary
}
