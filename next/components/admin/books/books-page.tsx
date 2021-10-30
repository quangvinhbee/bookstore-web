import { useState } from 'react'
import { Book, BookService } from '../../../lib/api/services/bookService'
import { NumberPipe } from '../../../lib/pipes/number'
import { useAlert } from '../../../lib/providers/alert-provider'
import { Field } from '../../shared/form/field'
import { Form } from '../../shared/form/form'
import { ImageInput } from '../../shared/form/image-input'
import { Input } from '../../shared/form/input'
import { SaveButtonGroup } from '../../shared/form/save-button-group'
import { Img } from '../../shared/img'
import { BaseModel, DataTable } from '../../shared/table/data-table'
import { useBook } from './providers/book-provider'

export function BooksPage() {
    const [bookSelected, setBookSelected] = useState<Book>()
    const { createBook, updateBook } = useBook()
    const alert = useAlert()
    const create = (data: Book) => {
        createBook(data)
            .then(() => {
                alert.success('Tạo sách thành công')
            })
            .catch(() => {
                alert.error('Tạo sách thất bại')
            })
    }

    const update = (data: Book) => {
        updateBook({ ...data, id: bookSelected.id })
            .then(() => {
                alert.success('Cập nhật sách thành công').then(() => {
                    setBookSelected(null)
                })
            })
            .catch(() => {
                alert.error('Cập nhật sách thất bại')
            })
    }

    return (
        <>
            <DataTable<Book> crudService={BookService} model={'Book'} itemName="Sách">
                <DataTable.Header>
                    <DataTable.Title />
                    <DataTable.Buttons>
                        <DataTable.Button outline isRefreshButton refreshAfterTask />
                        <DataTable.Button primary isAddButton onClick={() => setBookSelected({})} />
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
                        label="Tên sách"
                        render={(item: Book) => <DataTable.CellText value={item.name} />}
                    />
                    <DataTable.Column
                        center
                        label="Ảnh"
                        render={(item: Book) => <DataTable.CellImage value={item.image} />}
                    />
                    <DataTable.Column
                        center
                        label="Tác giả"
                        render={(item: Book) => <DataTable.CellText value={item?.author?.name} />}
                    />
                    <DataTable.Column
                        center
                        label="Thể loại"
                        render={(item: Book) => <DataTable.CellText value={item?.category?.name} />}
                    />
                    <DataTable.Column
                        center
                        label="Giá"
                        render={(item: Book) => (
                            <DataTable.CellText value={NumberPipe(item.price, true)} />
                        )}
                    />
                    <DataTable.Column
                        center
                        label="Thể loại"
                        render={(item: Book) => (
                            <DataTable.CellText value={NumberPipe(item.price, true)} />
                        )}
                    />
                    <DataTable.Column
                        right
                        render={(item: Book) => (
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
                                    onClick={() => setBookSelected(item)}
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
                isOpen={!!bookSelected}
                title={`${bookSelected?.id ? 'Chỉnh sửa' : 'Thêm'} sách`}
                initialData={bookSelected}
                onSubmit={(data) => {
                    if (!bookSelected?.id) create(data)
                    else update(data)
                }}
                onClose={() => setBookSelected(null)}
            >
                <Field label="Tên sách" name="name">
                    <Input />
                </Field>
                <Field label="Hình ảnh" name="image">
                    <ImageInput />
                </Field>
                <Field label="Giá" name="price">
                    <Input type="number" />
                </Field>
                <Form.Footer>
                    <SaveButtonGroup onCancel={() => setBookSelected(null)} />
                </Form.Footer>
            </Form>
        </>
    )
}
