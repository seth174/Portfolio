import { Autocomplete, Checkbox, TextField, Typography } from "@mui/material";
import { FC } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface AutoCompleteProps {
    label: string,
    disabled: boolean,
    options: string[],
    setFilteredOptions: React.Dispatch<React.SetStateAction<Set<string>>>

}

const AutoCompleteFilter: React.FC<AutoCompleteProps> = (props: AutoCompleteProps) => {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;


    return (
        <Autocomplete
            multiple
            sx={{ width: '100%' }}
            disabled={props.disabled}
            limitTags={2}
            id="multiple-limit-tags"
            options={props.options}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField {...params} label={props.label} placeholder="" />
            )}
            onChange={(event, newInputValue) => {
                props.setFilteredOptions(new Set(newInputValue));
            }}
            isOptionEqualToValue={(option, value) => option === value}
            disableCloseOnSelect
            renderTags={(value, getTagProps) => {
                const tags = value.length < 2 ? value : value.slice(0, 2);
                const formattedTags = tags.map((value, index) => <Typography key={index} marginLeft={1}>{value.substring(0, 8)}</Typography>)
                if (tags.length < value.length) {
                    formattedTags.push(<Typography>...</Typography>)
                }
                return formattedTags;
                return ['']
            }

            }
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option}
                    </li>
                );
            }}
        />
    )
}

export default AutoCompleteFilter;