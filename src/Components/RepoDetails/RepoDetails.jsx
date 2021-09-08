import React, { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
    const [cloneBtnText, setCloneBtnText] = useState('Copy Clone URL')
    const location = useLocation();
    const {clone_url, created_at, description, forks, full_name, html_url, language, license, owner, watchers, stargazers_count } = location.state?.repo;

    const createdDate = new Date(created_at).toDateString();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(clone_url);
        setCloneBtnText('Copied!')
    }

    return (
        <Card className="m-4" >
            <Card.Header as="h2">
                <i className="bi bi-code-square"></i> {full_name}
            </Card.Header>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div className="mb-5 ml-1">
                        <Card.Title>About</Card.Title>
                        <Card.Text>                            
                            {description}
                        </Card.Text>
                    </div>
                    <h6 className="detail-badges">                        
                        <div>
                            <i className="bi bi-eye-fill" /> {watchers}
                        </div>
                        <div>
                            <i className="bi bi-star-fill" /> {stargazers_count}
                        </div>
                        <div>
                            <i className="bi bi-bezier" /> {forks}
                        </div>
                        <div>
                            <Badge className="m-1 float-right" variant="secondary">{language}</Badge>    
                        </div>
                    </h6>
                </div>
                <Button variant="primary" onClick={() => {window.location.href = html_url}}>View GitHub Page</Button>
                <Button className="ml-1" variant="secondary" onClick={copyToClipboard}>{cloneBtnText}</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Card.Text className="mb-0">License: <a href={license?.url}>{license?.name || "None"}</a></Card.Text>
                <Card.Text>Created by <a href={owner.html_url}>{owner.login}</a> on {[createdDate]}</Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default SearchResult;
