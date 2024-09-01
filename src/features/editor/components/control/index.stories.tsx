import '../../../../index.css';
import { Meta, StoryObj } from '@storybook/react';
import { Control } from './index';
import { Control as ControlEnum } from '../../types';

const meta: Meta<typeof Control> = {
  component: Control,
  title: 'Components/Control',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['input', 'checkbox', 'slider'],
    },
    label: { control: 'text' },
    id: { control: 'select', options: Object.values(ControlEnum) },
    value: { control: 'number' },
    min: { control: 'number', if: { arg: 'type', eq: 'slider' } },
    max: { control: 'number', if: { arg: 'type', eq: 'slider' } },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Control>;

const handleChangeMock = (
  id: ControlEnum,
  newValue: string | number | boolean,
  updateStart: boolean,
  updateEnd: boolean,
) => {
  console.log(
    `handleChange called with id: ${id}, value: ${newValue}, updateStart: ${updateStart}, updateEnd: ${updateEnd}`,
  );
};

export const Default: Story = {
  args: {
    type: 'input',
    label: 'Default Input',
    id: ControlEnum.HEIGHT,
    value: 10,
    min: 0,
    max: 100,
    handleChange: handleChangeMock,
  },
  render: (args) => <Control {...args} />,
};

export const CheckboxControl: Story = {
  args: {
    type: 'checkbox',
    label: 'Default Checkbox',
    id: ControlEnum.GRAYSCALE,
    value: true,
    handleChange: handleChangeMock,
  },
  render: (args) => <Control {...args} />,
};

export const SliderControl: Story = {
  args: {
    type: 'slider',
    label: 'Default Slider',
    id: ControlEnum.BLUR,
    value: 50,
    min: 0,
    max: 100,
    handleChange: handleChangeMock,
  },
  render: (args) => <Control {...args} />,
};
