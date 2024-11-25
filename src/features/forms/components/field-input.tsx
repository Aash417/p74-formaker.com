import React from 'react';

type Props = {
   type: string;
   value: string;
   onChange: () => void;
};

export default function FieldInput({}: Props) {
   return <div>FieldInput</div>;
}
