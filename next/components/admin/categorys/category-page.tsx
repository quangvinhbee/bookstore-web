import { format } from 'date-fns'
import { useState } from 'react'
import { Category, CategoryService } from '../../../lib/api/services/categoryService'
import { NumberPipe } from '../../../lib/pipes/number'
import { useAlert } from '../../../lib/providers/alert-provider'
import { DatePicker } from '../../shared/form/date'
import { Field } from '../../shared/form/field'
import { Form } from '../../shared/form/form'
import { ImageInput } from '../../shared/form/image-input'
import { Input } from '../../shared/form/input'
import { SaveButtonGroup } from '../../shared/form/save-button-group'
import { Img } from '../../shared/img'
import { BaseModel, DataTable, useDataTable } from '../../shared/table/data-table'
import { useCategory } from './providers/category-provider'

export function CategorysPage() {
    const [CategorySelected, setCategorySelected] = useState<Category>()
    const { createCategory, updateCategory } = useCategory()
    const alert = useAlert()
    const create = (data: Category) => {
        if (data?.birthday) {
            data.birthday = new Date(data.birthday).toISOString()
        }
        if (data?.deathday) {
            data.deathday = new Date(data.deathday).toISOString()
        }
        createCategory({ ...data })
            .then(() => {
                alert.success('Tạo Danh mục thành công').then(() => {
                    setCategorySelected(null)
                })
            })
            .catch(() => {
                alert.error('Tạo Danh mục thất bại')
            })
    }
    const update = (data: Category) => {
        if (data?.birthday) {
            data.birthday = new Date(data.birthday).toISOString()
        }
        if (data?.deathday) {
            data.deathday = new Date(data.deathday).toISOString()
        }
        updateCategory({ ...data, id: CategorySelected?.id })
            .then(() => {
                alert.success('Cập nhật Danh mục thành công').then(() => {
                    setCategorySelected(null)
                })
            })
            .catch(() => {
                alert.error('Cập nhật Danh mục thất bại')
            })
    }
    return (
        <>
            <DataTable<Category>
                crudService={CategoryService}
                model={'Category'}
                itemName="Danh mục"
            >
                <DataTable.Header>
                    <DataTable.Title />
                    <DataTable.Buttons>
                        <DataTable.Button outline isRefreshButton refreshAfterTask />
                        <DataTable.Button
                            primary
                            isAddButton
                            onClick={() => setCategorySelected({})}
                        />
                    </DataTable.Buttons>
                </DataTable.Header>

                <DataTable.Divider />

                <DataTable.Toolbar>
                    <DataTable.Search />
                    <DataTable.Filter></DataTable.Filter>
                </DataTable.Toolbar>

                <DataTable.Table>
                    <DataTable.Column
                        center
                        label="Tên"
                        render={(item: Category) => (
                            <DataTable.CellText value={item.name || item.displayName} />
                        )}
                    />
                    <DataTable.Column
                        center
                        label="Ảnh"
                        render={(item: Category) => {
                            console.log(item)
                            return <DataTable.CellImage value={item.image} />
                        }}
                    />

                    <DataTable.Column
                        right
                        render={(item: Category) => (
                            <>
                                <DataTable.CellButton
                                    hoverDanger
                                    value={item}
                                    isDeleteButton
                                    disabled={item.email == 'admin@gmail.com'}
                                />
                                <DataTable.CellButton
                                    hoverDanger
                                    value={item}
                                    isEditButton
                                    onClick={() => setCategorySelected(item)}
                                    disabled={item.email == 'admin@gmail.com'}
                                />
                            </>
                        )}
                    />
                </DataTable.Table>
                <DataTable.Pagination />
            </DataTable>
            <Form
                dialog
                isOpen={!!CategorySelected}
                title={`${CategorySelected?.id ? 'Chỉnh sửa' : 'Thêm'} Danh mục`}
                initialData={CategorySelected}
                onSubmit={(data) => {
                    if (!CategorySelected?.id) create(data)
                    else update(data)
                }}
                onClose={() => setCategorySelected(null)}
            >
                <Field label="Tên Danh mục" name="name">
                    <Input />
                </Field>

                <Field label="Hình ảnh" name="image">
                    <ImageInput />
                </Field>
                <Form.Footer>
                    <SaveButtonGroup onCancel={() => setCategorySelected(null)} />
                </Form.Footer>
            </Form>
        </>
    )
}
