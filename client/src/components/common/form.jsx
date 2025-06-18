import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const renderInputByComponentType = ({
    componentType,
    name,
    placeholder,
    type,
    label,
    options,
  }) => {
    const value = formData[name];

    switch (componentType) {
      case types.INPUT:
        return (
          <Input
            name={name}
            placeholder={placeholder}
            id={name}
            type={type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [name]: e.target.value,
              })
            }
          />
        );

      case types.SELECT:
        return (
          <Select
            value={value}
            onValueChange={(val) =>
              setFormData({
                ...formData,
                [name]: val,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label || option.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case types.TEXTAREA:
        return (
          <Textarea
            name={name}
            placeholder={placeholder}
            id={name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [name]: e.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            name={name}
            placeholder={placeholder}
            id={name}
            type={type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [name]: e.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div className="grid w-full gap-1.5" key={control.name}>
            <Label className="mb-1" htmlFor={control.name}>
              {control.label}
            </Label>
            {renderInputByComponentType(control)}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 w-full rounded bg-primary px-4 py-2 text-white"
        disabled={isBtnDisabled}
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
};

export default CommonForm;
