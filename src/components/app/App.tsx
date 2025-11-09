import { CSSProperties, useEffect, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';
import 'src/styles/index.scss';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const applyParams = (newParams: ArticleStateType) => {
		console.log('Новые настройки:', newParams);
		setArticleState(newParams);
	};

	useEffect(() => {
		document.title = 'Blog Customizer';
	}, []);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={applyParams} />
			<Article />
		</main>
	);
};
