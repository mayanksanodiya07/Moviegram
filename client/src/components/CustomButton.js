
function Button({ children,to, type, onClick }) {
 
  return (
    <button onClick={onClick}
      className={"rounded-full text-white bg-color-primary-light px-4 py-2 text-base border-0 hover:shadow-lg duration-100"}
      // onClick={() => navigate("/apprisal-from")}
    >
      {children}
      {/* <i class="fa-solid fa-angle-right ml-1"></i> */}
    </button>
  );
}

export default Button;
