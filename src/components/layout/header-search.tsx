

export const HeaderSearch = () => {
    return (
        <input 
        type="search"
        placeholder="Pesquisar"
        className="w-full text-lg border border-gray-200 rounded-2xl pl-12 py-3 bg-no-repeat bg-[16px_50%] bg-[size:24px] outline-0"
        style={{
            backgroundImage: `url('/assets/ui/search.png')`,
        }}
        />
    )
}