import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useRef, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef(null);
	const [formState, setFormState] = useState(defaultArticleState);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formRef,
		onClose: () => console.log('Форма закрыта'),
		onChange: setIsOpen,
	});

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleFontChange = (newFontFamily: OptionType) => {
		setFormState((prevState) => ({
			...prevState,
			fontFamilyOption: newFontFamily,
		}));
	};

	const handleFontSizeChange = (newFontSize: OptionType) => {
		setFormState((prevState) => ({
			...prevState,
			fontSizeOption: newFontSize,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={formRef}
				className={`${styles.container} 
				${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontChange}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
