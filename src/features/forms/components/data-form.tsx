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
import { FieldType } from '@/features/forms/server/types';

export default function DataForm({ formData }: any) {
   return (
      <div className="grid h-auto place-items-center">
         <div className="w-7/12 rounded-lg pb-10 md:w-3/4 lg:w-2/3 xl:w-1/2">
            <div className="space-y-6">
               <div className="flex gap-x-3 text-2xl">
                  <p className="font-bold">Title</p>
                  <p className="font-bold">:</p>
                  <p>{formData.title}</p>
               </div>

               <div className="flex gap-x-3 text-xl text-muted-foreground">
                  <p className="font-bold">Description</p>
                  <p className="font-bold">:</p>
                  <p>{formData.description}</p>
               </div>

               {formData.fields.map((field: FieldType, index: number) => (
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
         </div>
      </div>
   );
}
