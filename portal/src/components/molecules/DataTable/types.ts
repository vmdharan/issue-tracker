type DataTableProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: any[];
    confirmDelete: (id: string) => void;
    tag: string;
};

export type { DataTableProps };
