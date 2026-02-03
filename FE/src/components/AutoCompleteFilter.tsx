import { Autocomplete, Checkbox, TextField, Typography, Chip, Box } from "@mui/material";
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
            sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: '4px 8px',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                        background: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.25)',
                        transform: 'translateY(-2px)',
                    },
                },
                '& .MuiInputLabel-root': {
                    fontWeight: 600,
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    '&.Mui-focused': {
                        color: '#667eea',
                    },
                },
                '& .MuiInputBase-input': {
                    padding: '10px 4px !important',
                    fontSize: '0.9rem',
                },
                '& .MuiChip-root': {
                    height: '28px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%)',
                        transform: 'scale(1.05)',
                    },
                    '& .MuiChip-label': {
                        padding: '0 8px',
                    },
                    '& .MuiChip-deleteIcon': {
                        color: '#667eea',
                        fontSize: '1rem',
                        '&:hover': {
                            color: '#764ba2',
                        },
                    },
                },
            }}
            disabled={props.disabled}
            limitTags={2}
            id={`filter-${props.label.toLowerCase()}`}
            options={props.options}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    placeholder="Select..."
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(102, 126, 234, 0.2)',
                                borderWidth: '1.5px',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(102, 126, 234, 0.4)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#667eea',
                                borderWidth: '2px',
                            },
                        },
                    }}
                />
            )}
            onChange={(_, newInputValue) => {
                props.setFilteredOptions(new Set(newInputValue));
            }}
            isOptionEqualToValue={(option, value) => option === value}
            disableCloseOnSelect
            renderTags={(value, getTagProps) => {
                if (value.length === 0) return null;
                const tags = value.length <= 2 ? value : value.slice(0, 2);
                return (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                        {tags.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={index}
                                label={option.length > 12 ? `${option.substring(0, 12)}...` : option}
                                size="small"
                            />
                        ))}
                        {value.length > 2 && (
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 700,
                                    color: '#667eea',
                                    fontSize: '0.75rem',
                                    ml: 0.5,
                                }}
                            >
                                +{value.length - 2}
                            </Typography>
                        )}
                    </Box>
                );
            }}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                        component="li"
                        key={key}
                        {...optionProps}
                        sx={{
                            borderRadius: '10px',
                            margin: '2px 4px',
                            padding: '8px 12px',
                            transition: 'all 0.2s ease',
                            background: selected
                                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                                : 'transparent',
                            '&:hover': {
                                background: 'rgba(102, 126, 234, 0.08)',
                            },
                        }}
                    >
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                            sx={{
                                color: '#667eea',
                                padding: '4px',
                                '&.Mui-checked': {
                                    color: '#667eea',
                                },
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: selected ? 700 : 500,
                                fontSize: '0.9rem',
                                color: selected ? '#667eea' : 'text.primary',
                            }}
                        >
                            {option}
                        </Typography>
                    </Box>
                );
            }}
        />
    );
};

export default AutoCompleteFilter;
