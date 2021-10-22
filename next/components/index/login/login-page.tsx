export function LoginPage() {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="bg-white min-w-lg min-h-lg rounded-xl shadow-lg">
        <div className="w-full uppercase text-4xl font-semibold text-gray-600 py-8 flex items-center justify-center">
          Đăng nhập
        </div>
        <FormLogin />
      </div>
    </div>
  );
}
export function FormLogin() {
  return (
    <form className="px-8 pt-6 pb-8 mb-4">
      <div className="mb-8">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Tên đăng nhập
        </label>
        <input
          className="h-12 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Tên đăng nhập"
          type="text"
          placeholder="Tên đăng nhập"
        />
      </div>
      <div className="mb-8">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Mật khẩu
        </label>
        <input
          className="h-12 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="*************"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Đăng nhập
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Quên mật khẩu?
        </a>
      </div>
    </form>
  );
}
