import { DottedSeparator } from '@/components/dotted-separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GetFormResponseType } from '../api/use-get-form';

type Props = {
   formData: GetFormResponseType;
};

export default function DataForm({ formData }: Readonly<Props>) {
   if (!formData) return <div>...</div>;

   return (
      <div className="flex h-full justify-center">
         <Card>
            <CardHeader></CardHeader>
            <CardContent>
               <div className="w-[550px] space-y-6">
                  <div className="flex flex-col gap-x-3">
                     <p className="text-3xl font-bold">{formData.title}</p>
                     <p className="text-xl text-muted-foreground">
                        {formData.description}
                     </p>
                  </div>

                  <DottedSeparator />

                  {formData.fields.map((field, index: number) => (
                     <div key={index + 1} className="space-y-2">
                        <Label>
                           {field.label}
                           {field.isRequired && (
                              <span className="text-red-500">*</span>
                           )}
                        </Label>

                        {field.type === 'text' && <Input readOnly />}

                        {field.type === 'textarea' && <Textarea readOnly />}

                        {field.type === 'radio' && field.options && (
                           <RadioGroup>
                              {field.options
                                 .slice(1, -1)
                                 .split(',')
                                 .map((option: string, idx: number) => (
                                    <div
                                       className="flex items-center space-x-2"
                                       key={idx + 1}
                                    >
                                       <RadioGroupItem
                                          value={option.trim()}
                                          disabled
                                       />
                                       <Label>{option.trim()}</Label>
                                    </div>
                                 ))}
                           </RadioGroup>
                        )}

                        {field.type === 'select' && field.options && (
                           <Select>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                 {field.options
                                    .slice(1, -1)
                                    .split(',')
                                    .map((option: string, idx: number) => (
                                       <SelectItem
                                          key={idx + 1}
                                          value={option.trim()}
                                       >
                                          {option.trim()}
                                       </SelectItem>
                                    ))}
                              </SelectContent>
                           </Select>
                        )}
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
