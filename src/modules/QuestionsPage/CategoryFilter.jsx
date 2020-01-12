import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getCategories } from '../../services/category.service';
import i18n from 'i18next';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    tabs: {
        maxWidth: '1280px',
        padding: '0 20px',
        margin: '0 auto',
        '& .MuiTabs-flexContainer': {
            justifyContent: 'flex-start'
        }
    }
});

const CategoryFilter = ({ category, history }) => {
    const classes = useStyles();

    const [categories, setCategories] = React.useState([]);

    // Fetch categories
    React.useEffect(() => {
        getCategories()
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.log(err.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categoriesAdded = [
        { slug: '', nameVi: 'Tất cả', nameEn: 'All' },
        ...categories
    ];

    const categoryElements = categoriesAdded.map(ele => (
        <Tab
            key={ele.slug}
            label={ele[
                i18n.language === 'vi' ? 'nameVi' : 'nameEn'
            ].toUpperCase()}
        />
    ));

    const handleChange = (event, newValue) => {
        const newCat = categoriesAdded[newValue];
        history.push(`/questions?category=${newCat.slug}&page=1`);
    };

    const value = categoriesAdded.findIndex(cat => cat.slug === (category || ''));

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabs}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {categoryElements}
            </Tabs>
        </Paper>
    );
};

export default CategoryFilter;
