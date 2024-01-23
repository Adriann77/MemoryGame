import styles from './MainLayout.module.scss';

export const MainLayout = (props: any) => {
	return <div className={styles.layout}>{props.children}</div>;
};
