import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
    return (
        <Form className="mb-4">
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onParamChange} value={params.description} name="name" type="text"/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Language</Form.Label>
                    <Form.Control onChange={onParamChange} value={params.location} name="language" type="text"/>
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check className="mb-2" value={params.sort === 'stars'} onChange={onParamChange} name="sort" id="sort" label="Sort by Stars" type="checkbox" />
                </Form.Group>
            </Form.Row>
        </Form>
    );
}

export default SearchForm;
