/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceAPI } from '~/types/schema';

type ItemContentProps = {
    service: ServiceAPI;
    tag: string;
    tagTitle: string;
    columns: any[];
};

export default ItemContentProps;
