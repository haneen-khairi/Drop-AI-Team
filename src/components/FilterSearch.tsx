import React, { useState } from 'react';
import { CategoriesGrouped, CategoryTag, FilterData } from 'utils/types';
import { DateRangePicker, SelectPicker, Input, InputGroup, Button, Stack, Form } from 'rsuite';
import { Search, Funnel } from '@rsuite/icons';
// import { useQuery } from '@tanstack/react-query';
// import { fetchWebsiteCategories } from 'utils/api';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { fetchFilterCategories } from 'utils/api';
import { useQuery } from '@tanstack/react-query';
import { ItemDataType } from 'rsuite/esm/@types/common';
interface FilterSearchProps {
    onFilterChange: (filter: FilterData) => void;
    currentFilter?: FilterData;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ onFilterChange, currentFilter }) => {
    const [searchValue, setSearchValue] = useState(currentFilter?.queryset || '');
    const [website, setWebsite] = useState(currentFilter?.website || '');
    const [category, setWebsiteCategory] = useState(currentFilter?.category || '');
    const [date, setDate] = useState<DateRange | null>(
        currentFilter?.from_date && currentFilter?.to_date ?
            [currentFilter?.from_date, currentFilter?.to_date] :
            null
    );
    const [fromPrice, setFromPrice] = useState(currentFilter?.from_price || '');
    const [toPrice, setToPrice] = useState(currentFilter?.to_price || '');


    const handleInputChange = (value: string) => {
        setSearchValue(value);
    };

    const websiteChange = (value: string | null) => {
        setWebsite(value ? value : '');
        setWebsiteCategory('');
    };
    const websiteCategoryChange = (value: string | null) => {
        setWebsiteCategory(value ? value : '');
    };
    const dateChange = (value: DateRange | null) => {
        setDate(value);
    };
    const fromPriceChange = (value: string | null) => {
        setFromPrice(value ? value : '');
    };
    const toPriceChange = (value: string | null) => {
        setToPrice(value ? value : '');
    };

    const {
        data: { amazon = [], ali = [], cj = [] } = {},
        // isLoading,
        // isError
    } = useQuery<CategoriesGrouped, Error>(['website-category',], () =>
        fetchFilterCategories()
    );

    const handleFilterClick = () => {
        const filterData: FilterData = {
            queryset: searchValue,
            website: website,
            from_date: date ? date[0] : null,
            to_date: date ? date[1] : null,
            from_price: fromPrice,
            to_price: toPrice,
            category,
            page: 1
        };

        onFilterChange(filterData);
    };

    const websites = ['All', 'Amazon', 'Ali_express', 'Cj_Dropshipping'].map(
        item => ({ label: item.replace(/_/g, " "), value: item })
    );

    const mapWebsiteCategories = () => {
        let cats: ItemDataType<string>[] = []
        if (website === undefined) {
            return cats
        }
        if (amazon.length > 0 && website === "Amazon" || website === "All") {
            cats = [...amazon.map((item: CategoryTag) => ({ label: item._id, value: item._id }))];
        }
        if (ali.length > 0 && website === "Ali_express" || website === "All") {
            cats = [...ali.map((item: CategoryTag) => ({ label: item._id, value: item._id }))];
        }
        if (cj.length > 0 && website === "Cj_Dropshipping" || website === "All") {
            cats = [...cj.map((item: CategoryTag) => ({ label: item._id, value: item._id }))];
        }
        return cats;
    }

    return (
        <Form onSubmit={handleFilterClick}>
            <Stack className='filter-stack' direction='column' spacing={30} >
                <Stack.Item className='filter-txt-form' grow={1} alignSelf='stretch'>
                    <Stack spacing={6}>
                        <Stack.Item grow={1}>
                            <InputGroup className='filter-input'>
                                <InputGroup.Addon style={{ 'background': 'white' }}>
                                    <Search />
                                </InputGroup.Addon>
                                <Input value={searchValue} size="lg" placeholder='Search' onChange={handleInputChange} />
                            </InputGroup>
                        </Stack.Item>
                        <Button size="lg" type='submit' disabled={searchValue === ""} className='filter-btn' color='violet' appearance="primary" startIcon={<Funnel />}>
                            Filter
                        </Button>
                    </Stack>
                </Stack.Item>

                <Stack spacing={6} wrap justifyContent='center'>
                    <SelectPicker value={website} onChange={websiteChange} className='limit-width-200' data={websites} appearance="default" placeholder="websites" />
                    <DateRangePicker value={date} onChange={dateChange} showOneCalendar className='input-group limit-width-250' editable={false} />
                    <InputGroup className='input-group limit-width-300'>
                        <Input value={fromPrice} onChange={fromPriceChange} placeholder="price" />
                        <InputGroup.Addon>to</InputGroup.Addon>
                        <Input value={toPrice} onChange={toPriceChange} placeholder="price" />
                    </InputGroup>
                    <SelectPicker value={category} onChange={websiteCategoryChange} disabled={website === ''} className='limit-width-200' data={mapWebsiteCategories()} appearance="default" placeholder="Category" />
                </Stack>

            </Stack>
        </Form>
    );
};

export default FilterSearch;
