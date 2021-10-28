import { createContext, useContext, useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import { Table } from './table'
import { useAlert } from '../../../lib/providers/alert-provider'
import { useToast } from '../../../lib/providers/toast-provider'
import useInterval from '../../../lib/hooks/useInterval'
import { Schema } from 'mongoose'
import { callAPI } from '../../../lib/api'
import axios from 'axios'
import { CrudService, Pagination } from '../../../lib/api/services/crudService'
import { TablePagination } from './table-pagination'
import { TableHeader } from './table-header'
import { TableToolbar } from './table-toolbar'

export interface BaseModel {
    id?: string
    updatedAt?: string
    createdAt?: string
    [x: string]: any
}

interface DataTableProps extends ReactProps {
    title?: string
    headers?: string[]
    itemName?: string
    fragment?: string
    apiName?: string
    limit?: number
    filter?: any
    order?: any
    createItem?: () => any
    extraParams?: object
    autoRefresh?: number
    model: String
    crudService: CrudService<any>
}
export function DataTable<T extends BaseModel>({
    crudService,
    limit = 10,
    order = { createdAt: -1 },
    ...props
}: DataTableProps) {
    const [items, setItems] = useState<any[]>()
    const [pagination, setPagination] = useState<Pagination>({ page: 1, total: 0, limit: limit })
    const [title, setTitle] = useState(props.title)
    const [loadingItems, setLoadingItems] = useState(false)
    const [selection, setSelection] = useState<any>()
    const [refreshing, setRefreshing] = useState(false)
    const headers = props.headers
    let [filter, setFilter] = useState({})
    const [search, setSearch] = useState('')
    const alert = useAlert()
    const toast = useToast()
    console.log(pagination)
    const loadAll = async () => {
        setLoadingItems(true)
        crudService
            .getAll({
                filter: { ...filter, name: search },
                query: { limit: pagination.limit, page: pagination.page },
            })
            .then((res) => {
                var data = res.data.response.results
                var pagi: Pagination = {
                    limit: res?.data?.response?.limit,
                    page: res?.data?.response?.page,
                    total: res?.data?.response?.totalResults,
                }
                setItems(cloneDeep(data))
                if (pagination.total == 0)
                    setPagination({
                        ...pagination,
                        total: pagi?.total,
                    })
            })
            .catch((err) => {
                alert.error(err.message)
            })
            .finally(() => setLoadingItems(false))
    }

    const onDeleteItem = async (value: any) => {
        console.log(value)
        if (
            !(await alert.danger(
                `Xoá ${props.itemName}`,
                `Bạn có chắn chắn muốn xoá ${props.itemName} ${
                    value.name ? `'${value.name}'` : 'này'
                } không?`
            ))
        )
            return
        await crudService
            .deleteOne(value.id)
            .then((res) => {
                alert.success(res?.data?.response?.message).then(() => loadAll())
            })
            .catch((err) => {
                alert.error('Lỗi không thể xóa')
            })
    }
    const onRefresh = async () => {
        try {
            setRefreshing(true)
            await loadAll()
        } finally {
            setRefreshing(false)
        }
    }
    const onFilterChange = (registeredFilter: any) => {
        let newFilter = { ...filter, ...registeredFilter }
        newFilter = Object.keys(newFilter)
            .filter(
                (key) =>
                    newFilter[key] !== '' && newFilter[key] !== undefined && newFilter[key] !== null
            )
            .reduce((obj, key) => {
                obj[key] = newFilter[key]
                return obj
            }, {})
        if (!isEqual(filter, newFilter)) {
            filter = newFilter
            setFilter(newFilter)
        }
    }

    const onSearchChange = (search: string) => {
        setSearch(search)
    }
    useEffect(() => {
        loadAll()
    }, [search, filter, props.filter, pagination.page, pagination.limit, props.extraParams])
    useEffect(() => {
        setTitle(`Danh sách ${props.itemName.toLocaleLowerCase()}`)
    }, [])
    return (
        <DataTableContext.Provider
            value={{
                title,
                loadAll,
                items,
                itemName: props.itemName,
                pagination,
                setPagination,
                loadingItems,
                setLoadingItems,
                selection,
                setSelection,
                headers,
                onRefresh,
                onDeleteItem,
                onFilterChange,
                onSearchChange,
            }}
        >
            {props.children}
        </DataTableContext.Provider>
    )
}

interface DataTableContextProps extends ReactProps {
    title: string
    itemName: string
    pagination: Pagination
    setPagination: (val: Pagination) => any
    items: any[]
    loadAll?: () => void
    loadingItems?: boolean
    setLoadingItems?: any
    selection?: any
    setSelection?: any
    headers?: String[]
    onDeleteItem?: (value: any) => Promise<any>
    refreshing?: any
    setRefreshing?: any
    onRefresh?: () => Promise<any>
    onFilterChange?: (registeredFilter: any) => void
    onSearchChange?: (search: string) => void
}
const DataTableContext = createContext<Partial<DataTableContextProps>>({})
export const useDataTable = () => useContext(DataTableContext)

export const TableDivider = () => <hr className="my-3 border-0 border-t border-gray-200" />

DataTable.Divider = TableDivider

DataTable.Header = TableHeader
DataTable.Title = TableHeader.Title
DataTable.Buttons = TableHeader.Buttons
DataTable.Button = TableHeader.Button

DataTable.Toolbar = TableToolbar
DataTable.Search = TableToolbar.Search
DataTable.Filter = TableToolbar.Filter

DataTable.Table = Table
DataTable.Column = Table.Column
DataTable.CellAction = Table.CellAction
DataTable.CellButton = Table.CellButton
DataTable.CellDate = Table.CellDate
DataTable.CellImage = Table.CellImage
DataTable.CellNumber = Table.CellNumber
DataTable.CellBoolean = Table.CellBoolean
DataTable.CellStatus = Table.CellStatus
DataTable.CellText = Table.CellText

DataTable.Pagination = TablePagination

DataTable.Consumer = DataTableContext.Consumer
