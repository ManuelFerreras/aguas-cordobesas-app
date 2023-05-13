import ClientPopup from '@/components/CompositeComponents/ClientPopup/ClientPopup'
import React from 'react'

export default {
    component: ClientPopup,
    title: 'CompositeComponents/ClientPopup'
}

interface StoryTemplate extends React.FC {
    args?: Partial<React.ComponentProps<typeof ClientPopup>>
}

const Template: StoryTemplate = (args) => <ClientPopup {...args} />

export const ClientPopupStory = Template.bind({})
ClientPopupStory.args = {}