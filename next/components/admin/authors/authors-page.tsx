import { format } from 'date-fns'
import { useState } from 'react'
import { Author, AuthorService } from '../../../lib/api/services/authorService'
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
import { useAuthor } from './providers/author-provider'

export function AuthorsPage() {
    const [authorSelected, setAuthorSelected] = useState<Author>()
    const { createAuthor, updateAuthor } = useAuthor()
    const alert = useAlert()
    const create = (data: Author) => {
        if (data?.birthday) {
            data.birthday = new Date(data.birthday).toISOString()
        }
        if (data?.deathday) {
            data.deathday = new Date(data.deathday).toISOString()
        }
        createAuthor({ ...data })
            .then(() => {
                alert.success('Tạo Tác giả thành công').then(() => {
                    setAuthorSelected(null)
                })
            })
            .catch(() => {
                alert.error('Tạo Tác giả thất bại')
            })
    }

    const update = (data: Author) => {
        if (data?.birthday) {
            data.birthday = new Date(data.birthday).toISOString()
        }
        if (data?.deathday) {
            data.deathday = new Date(data.deathday).toISOString()
        }
        updateAuthor({ ...data, id: authorSelected.id })
            .then(() => {
                alert.success('Cập Tác giả thành công').then(() => {
                    setAuthorSelected(null)
                })
            })
            .catch(() => {
                alert.error('Cập Tác giả thất bại')
            })
    }

    return (
        <>
            <DataTable<Author> crudService={AuthorService} model={'Author'} itemName="Tác giả">
                <DataTable.Header>
                    <DataTable.Title />
                    <DataTable.Buttons>
                        <DataTable.Button outline isRefreshButton refreshAfterTask />
                        <DataTable.Button
                            primary
                            isAddButton
                            onClick={() => setAuthorSelected({})}
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
                        render={(item: Author) => (
                            <DataTable.CellText value={item.name || item.displayName} />
                        )}
                    />
                    <DataTable.Column
                        center
                        label="Ảnh"
                        render={(item: Author) => {
                            console.log(item)
                            return <DataTable.CellImage value={item.image} compress={10} />
                        }}
                    />
                    <DataTable.Column
                        center
                        label="Ngày sinh"
                        render={(item: Author) => <DataTable.CellDate value={item.birthday} />}
                    />
                    <DataTable.Column
                        center
                        label="Ngày mất"
                        render={(item: Author) => <DataTable.CellDate value={item.deathday} />}
                    />
                    <DataTable.Column
                        right
                        render={(item: Author) => (
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
                                    onClick={() => setAuthorSelected(item)}
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
                isOpen={!!authorSelected}
                title={`${authorSelected?.id ? 'Chỉnh sửa' : 'Thêm'} tác giả`}
                initialData={authorSelected}
                onSubmit={(data) => {
                    if (!authorSelected?.id) create(data)
                    else update(data)
                }}
                onClose={() => setAuthorSelected(null)}
            >
                <Field label="Tên tác giả" name="name">
                    <Input />
                </Field>

                <Field label="Hình ảnh" name="image">
                    <ImageInput />
                </Field>

                <Field label="Ngày sinh" name="birthday">
                    <DatePicker />
                </Field>
                <Field label="Ngày mất" name="deathday">
                    <Input defaultValue={null} />
                </Field>
                <Form.Footer>
                    <SaveButtonGroup onCancel={() => setAuthorSelected(null)} />
                </Form.Footer>
            </Form>
        </>
    )
}
