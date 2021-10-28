import { Book, BookService } from '../../../lib/api/services/bookService'
import { NumberPipe } from '../../../lib/pipes/number'
import { BaseModel, DataTable } from '../../shared/table/data-table'

export function BooksPage() {
    return (
        <DataTable<Book> crudService={BookService} model={'Book'} itemName="Sách">
            <DataTable.Header>
                <DataTable.Title />
                <DataTable.Buttons>
                    <DataTable.Button outline isRefreshButton refreshAfterTask />
                    <DataTable.Button primary isAddButton />
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
                    render={(item: Book) => <DataTable.CellText value={item.title} />}
                />
                <DataTable.Column
                    center
                    label="Giá"
                    render={(item: Book) => (
                        <DataTable.CellText value={NumberPipe(item.price, true)} />
                    )}
                />
                <DataTable.Column
                    right
                    render={(item: Book) => (
                        <DataTable.CellButton
                            hoverDanger
                            value={item}
                            isDeleteButton
                            disabled={item.email == 'admin@gmail.com'}
                        />
                    )}
                />
            </DataTable.Table>
            <DataTable.Pagination />
        </DataTable>
    )
}
