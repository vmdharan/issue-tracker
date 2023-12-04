import { CurrentSessionTokenPropsType } from '~/types/token';

type LoginPropsType = {
    setToken: (_: CurrentSessionTokenPropsType) => void;
};

export type { LoginPropsType };
