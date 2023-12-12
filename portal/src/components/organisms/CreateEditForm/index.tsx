import React, { FormEvent, useEffect, useState } from 'react';
import { CreateEditFormPropsType } from './types';
import Button from 'components/atoms/Button';
import Box from 'components/atoms/Box';
import TextField from 'components/atoms/TextField';
import { useNavigate, useParams } from 'react-router-dom';

const CreateEditForm = (props: CreateEditFormPropsType) => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
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

    return (
        <Box sx={{ width: '480px' }}>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                {props &&
                    props.schema.map((s) => {
                        if (s.type == 'TextBox') {
                            return (
                                <TextField
                                    label={s.name}
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
                        }

                        return (
                            <TextField
                                label={s.name}
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
