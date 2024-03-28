import { useEffect, useState } from "react";
import useProductQuery from "../../../hooks/useProductQuery";
import { TProduct } from "../../../types/products";
import Loading from "../Loading";
import { useGetTotalPageProduct } from "../../../hooks/useGetTotalPageProduct";
import ProductItemComponent from "./ProductItemComponent";

const ProductsListComponent = () => {
    const [page, setPage] = useState<number>(1);
    const { totalPage } = useGetTotalPageProduct();
    const { data: products, isLoading, isError, refetch } = useProductQuery({ page, limit: 12 });

    useEffect(() => {
        refetch();
    }, [page])

    if (isLoading) return <Loading />;
    if (isError) return <div>Product Not Found</div>;
    return (
        <>
            <section className="news">
                <div className="container">
                    <div className="section-body">
                        <div className="product-list">
                            {products?.length > 0 ? products.map((product: TProduct) => (
                                <ProductItemComponent product={product} key={product._id} />
                            )) : <>Product Not Found</>}O
                        </div>
                    </div>
                </div>
            </section>

            <section className="pagination">
                {page >= totalPage.length ? <button className="prev-btn" onClick={() => setPage(page - 1)}>Prev</button> : ""}
                <ul className="page-list">
                    {totalPage.map((page) => (
                        <li key={page} onClick={() => setPage(page)} className="page-item">
                            {page}
                        </li>
                    ))}
                </ul>
                {page < totalPage.length ? <button className="next-btn" onClick={() => setPage(page + 1)}>Next</button> : ""}

            </section>
        </>
    )
}

export default ProductsListComponent