import ClientPopup, { ClientPopupProps } from '@/components/CompositeComponents/ClientPopup/ClientPopup'
import React, { FC } from 'react'

export default {
    component: ClientPopup,
    title: 'CompositeComponents/ClientPopup'
}

interface StorybookTemplate extends FC<ClientPopupProps> {
    args?: Partial<ClientPopupProps>
  }

const Template: StorybookTemplate = (args) => <ClientPopup {...args} />

export const ClientPopupStory = Template.bind({})
ClientPopupStory.args = {
    onClose: () => {},
    onClientAdded: () => {}
}