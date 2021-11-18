import { format } from 'date-fns'
import { useState } from 'react'
import { RoleOptions, User, UserService } from '../../../lib/api/services/userService'
import { NumberPipe } from '../../../lib/pipes/number'
import { useAlert } from '../../../lib/providers/alert-provider'
import { DatePicker } from '../../shared/form/date'
import { Field } from '../../shared/form/field'
import { Form } from '../../shared/form/form'
import { ImageInput } from '../../shared/form/image-input'
import { Input } from '../../shared/form/input'
import { SaveButtonGroup } from '../../shared/form/save-button-group'
import { BaseModel, DataTable, useDataTable } from '../../shared/table/data-table'
import { useUser } from './providers/user-provider'

export function UsersPage() {
    const [UserSelected, setUserSelected] = useState<User>()
    const { createUser, updateUser } = useUser()
    const alert = useAlert()
    const create = (data: User) => {
        if (data?.birthday) {
            data.birthday = new Date(data.birthday).toISOString()
        }
        if (data?.deathday) {
            data.deathday = new Date(data.deathday).toISOString()
        }
        createUser({ ...data })
            .then(() => {
                alert.success('Tạo người dùng thành công').then(() => {
                    setUserSelected(null)
                })
            })
            .catch(() => {
                alert.error('Tạo người dùng thất bại')
            })
    }

    const update = (data: User) => {
        if (data?.birthday) {
            data.birthday = new Date(data.birthday).toISOString()
        }
        if (data?.deathday) {
            data.deathday = new Date(data.deathday).toISOString()
        }
        updateUser({ ...data, id: UserSelected.id })
            .then(() => {
                alert.success('Cập người dùng thành công').then(() => {
                    setUserSelected(null)
                })
            })
            .catch(() => {
                alert.error('Cập người dùng thất bại')
            })
    }

    return (
        <>
            <DataTable<User> crudService={UserService} model={'User'} itemName="người dùng">
                <DataTable.Header>
                    <DataTable.Title />
                    <DataTable.Buttons>
                        <DataTable.Button outline isRefreshButton refreshAfterTask />
                        <DataTable.Button primary isAddButton onClick={() => setUserSelected({})} />
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
                        label="Ảnh"
                        render={(item: User) => {
                            console.log(item)
                            return <DataTable.CellImage value={item.image} avatar />
                        }}
                    />
                    <DataTable.Column
                        center
                        label="Tên"
                        render={(item: User) => (
                            <DataTable.CellText value={item.name || item.displayName} />
                        )}
                    />

                    <DataTable.Column
                        center
                        label="Email"
                        render={(item: User) => <DataTable.CellText value={item.email} />}
                    />
                    <DataTable.Column
                        center
                        label="Vai trò"
                        render={(item: User) => (
                            <DataTable.CellStatus value={item.role} options={RoleOptions} />
                        )}
                    />

                    <DataTable.Column
                        right
                        render={(item: User) => (
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
                                    onClick={() => setUserSelected(item)}
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
                isOpen={!!UserSelected}
                title={`${UserSelected?.id ? 'Chỉnh sửa' : 'Thêm'} người dùng`}
                initialData={UserSelected}
                onSubmit={(data) => {
                    if (!UserSelected?.id) create(data)
                    else update(data)
                }}
                onClose={() => setUserSelected(null)}
            >
                <Field label="Tên người dùng" name="name">
                    <Input />
                </Field>
                <Field label="Email" name="email" readonly={UserSelected?.id ? true : false}>
                    <Input />
                </Field>
                {!UserSelected?.id && (
                    <Field label="Mật khẩu" name="password">
                        <Input type="password" />
                    </Field>
                )}

                <Field label="Hình ảnh" name="image">
                    <ImageInput />
                </Field>

                <Form.Footer>
                    <SaveButtonGroup onCancel={() => setUserSelected(null)} />
                </Form.Footer>
            </Form>
        </>
    )
}
