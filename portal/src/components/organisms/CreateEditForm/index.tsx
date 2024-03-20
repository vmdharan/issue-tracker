/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useState } from 'react';
import { CreateEditFormPropsType } from './types';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Box from 'components/atoms/Box';
import TextField from 'components/atoms/TextField';
import Select from 'components/atoms/Select';
import MenuItem from 'components/atoms/MenuItem';
import { FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import toSentenceCase from 'helpers/toSentenceCase';

import Typography from 'components/atoms/Typography';
import * as styles from './index.module.scss';

const CreateEditForm = (props: CreateEditFormPropsType) => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [dropdownData, setDropdownData] = useState<any[]>([]);
    const { id } = useParams();
    const title = `${props.type} ${props.name}`;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const result = await props.loadData(props.itemName, id);
                setData(result[0]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setDropdownData([]);
        const fillDropdowns = async () =>
            props.loadDropdowns?.forEach((f) => {
                getDropdownData(f.name);
            });
        fillDropdowns();
        console.log(dropdownData);
    }, [props.loadDropdowns]);

    const getDropdownData = async (entity: string) => {
        const result = await props.loadDropdowns
            ?.filter((f) => f.name == entity)[0]
            .selector(entity)
            .then((res) => res);
        if (result) {
            setDropdownData((val) => [
                { entity, data: result },
                ...val.filter((f) => f[entity] != entity),
            ]);
        }
    };

    const getKeyValue = (key: string, obj: object) =>
        obj ? Object.entries(obj).find((f) => f[0] === key)?.[1] ?? '' : '';
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await props.submitData(
            props.itemName,
            id ?? '-1',
            JSON.stringify(data),
        );
        if (res?.success) {
            navigate(-1);
        }
    };
    const setKeyValue = (key: string, value: string, obj: object) => {
        setData({ ...obj, [key]: value });
    };

    const handleSelectChange = (e: SelectChangeEvent<any>, name: string) => {
        setKeyValue(name, e.target.value, data);
    };

    return (
        <Box className={styles['create-edit-form-content']}>
            <Typography variant='h4' component='h1'>{title}</Typography>
            <form onSubmit={handleSubmit} style={{ maxWidth: '480px' }}>
                {props &&
                    props.schema.map((s) => {
                        if (s.type == 'TextField') {
                            return (
                                <TextField
                                    label={toSentenceCase(s.name)}
                                    name={s.name}
                                    key={s.name}
                                    onChange={(e) =>
                                        setKeyValue(s.name, e.target.value, data)
                                    }
                                    value={getKeyValue(s.name, data)}
                                    fullWidth
                                    sx={{ margin: '8px', display: 'block' }}
                                />
                            );
                        } else if (s.type == 'TextArea') {
                            return (
                                <TextField
                                    label={toSentenceCase(s.name)}
                                    name={s.name}
                                    key={s.name}
                                    onChange={(e) =>
                                        setKeyValue(s.name, e.target.value, data)
                                    }
                                    value={getKeyValue(s.name, data)}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    sx={{ margin: '8px', display: 'block' }}
                                />
                            );
                        } else if (s.type == 'Select') {
                            return (
                                <FormControl key={`fc_${s.name}`} fullWidth>
                                    <InputLabel id={`selectLabel_${s.name}`}>
                                        {toSentenceCase(s.name)}
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId={`selectLabel_${s.name}`}
                                        id={`select_${s.name}`}
                                        label={toSentenceCase(s.name)}
                                        value={getKeyValue(s.name, data)}
                                        onChange={(e) =>
                                            handleSelectChange(e, s.name)
                                        }
                                        sx={{ margin: '8px', display: 'block' }}
                                    >
                                        {dropdownData && s.entity ? (
                                            dropdownData
                                                .find((f) => f.entity == s.entity)
                                                ?.data?.map((m: any) => (
                                                    <MenuItem
                                                        key={`{${s.entity}_mi_${m.value}`}
                                                        value={m.value}
                                                    >
                                                        {m.name}
                                                    </MenuItem>
                                                ))
                                        ) : (
                                            <></>
                                        )}
                                    </Select>
                                </FormControl>
                            );
                        }

                        return (
                            <TextField
                                label={toSentenceCase(s.name)}
                                name={s.name}
                                key={s.name}
                                onChange={(e) =>
                                    setKeyValue(s.name, e.target.value, data)
                                }
                                value={getKeyValue(s.name, data)}
                            />
                        );
                    })}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ margin: '8px' }}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CreateEditForm;
