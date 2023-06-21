import { useDispatch, useSelector } from 'react-redux';
import Style from './styles.module.css';
import { changeCurrentPage } from '../../Redux/actions';

export const Pagination = () => {
	const pageNumbers = useSelector((state) => state.pageNumbers);
	const currentPage = useSelector((state) => state.currentPage);

	const dispatch = useDispatch();

	const onPreviusPage = () => {
		if (currentPage === 1) {
			return;
		}
		dispatch(changeCurrentPage(false));
	};

	const onNextPage = () => {
		dispatch(changeCurrentPage(true));
	};

	const onSpecificPage = (number) => {
		dispatch(changeCurrentPage(number));
	};

	if (pageNumbers.length < 2) {
		return null;
	}

	return (
		<nav className={Style.pagination_container}>
			<button className={Style.navigation_buttons} onClick={onPreviusPage}>
				Anterior
			</button>
			<div className={Style.pages_number}>
				{pageNumbers.map((page) => {
					if (page >= currentPage + 4 || page <= currentPage - 4) {
						return null;
					}
					return (
						<button
							key={page}
							className={Style.navigation_steps}
							style={{
								color: currentPage === page && '#18e1e4',
								borderColor: currentPage === page && '#18e1e4',
							}}
							onClick={() => {
								onSpecificPage(page);
							}}
						>
							{page}
						</button>
					);
				})}
			</div>
			<button
				className={Style.navigation_buttons}
				onClick={currentPage !== pageNumbers.length && onNextPage}
			>
				Siguiente
			</button>
		</nav>
	);
};
