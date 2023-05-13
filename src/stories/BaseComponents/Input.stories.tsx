import { VariantEnum } from "@/common/Types";
import Input, { InputProps } from "@/components/BaseComponents/Input/Input";
import { preventNumbersLowerThanZero } from "@/lib/utils/utils";
import React from "react";

export default {
    component: Input,
    title: 'BaseComponents/Input'
}

interface StoryTemplate extends React.FC<InputProps> {
    args?: Partial<InputProps>
}

const Template: StoryTemplate = (args) => <Input {...args} />

export const ClientInput = Template.bind({})
ClientInput.args = {
    legendContent: 'Client Id',
    variant: VariantEnum.primary,
    inputType: 'number',
    onChange: preventNumbersLowerThanZero
}