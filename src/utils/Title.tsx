
const Title = ({title, subTitle}:{title:string, subTitle:string}) => {
    return (
        <div className="my-5">
            <h1 className="text-center text-3xl font-semibold text-[#1e1e1e]">{title}</h1> 
            <p className="text-center opacity-80 ">{subTitle}</p>           
        </div>
    );
};

export default Title;