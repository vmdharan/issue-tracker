/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceAPI } from 'schemas/types';

type ItemContentProps = {
    service: ServiceAPI;
    tag: string;
    tagTitle: string;
    columns: any[];
};

export default ItemContentProps;
