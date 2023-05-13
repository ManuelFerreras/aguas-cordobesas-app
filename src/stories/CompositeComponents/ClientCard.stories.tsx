import React, { FC } from 'react'
import { VariantEnum } from '@/common/Types'

import ClientCard, {
  ClientCardProps
} from '@/components/CompositeComponents/ClientCard/ClientCard'

export default {
  component: ClientCard,
  title: 'CompositeComponents/ClientCard'
}

interface StorybookTemplate extends FC<ClientCardProps> {
  args?: Partial<ClientCardProps>
}

const Template: StorybookTemplate = (args) => <ClientCard {...args} />

export const DarkCard = Template.bind({})
DarkCard.args = {
  client: {
    id: 1,
    name: 'Manuel Ferreras',
    agId: 469646,
    ultimaDeuda: '$ 500.00',
    utlimoPeriodo: '05/2023',
    vtoUltimoPeriodo: '05/10/2023'
  },
  variant: VariantEnum.primary
}

export const LightCard = Template.bind({})
LightCard.args = {
  client: {
    id: 2,
    name: 'Luisina',
    agId: 463646,
    ultimaDeuda: '$ 502.00',
    utlimoPeriodo: '05/2023',
    vtoUltimoPeriodo: '05/20/2023'
  },
  variant: VariantEnum.secondary
}
