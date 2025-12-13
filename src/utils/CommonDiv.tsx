/* eslint-disable @typescript-eslint/no-explicit-any */

const CommonDiv = ({ children }: { children: any }) => {
    return (
        <div className="w-[calc(100%-10px)] md:w-[90%] max-w-7xl mx-auto">
            {children}
        </div>
    );
};

export default CommonDiv;