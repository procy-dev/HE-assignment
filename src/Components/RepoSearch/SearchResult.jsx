import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Repo = ({ repo }) => {
    const { name, stargazers_count, owner, id, language } = repo;

    return (
        <Link className="repo-link mb-2" to={{ pathname: `/details/${id}`, state: { repo: repo } }}>
            <Card className="repo-item">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Card.Title>
                                {name} - <span className="text-muted font-weight-light">{owner.login}</span>
                            </Card.Title>
                            <Card.Subtitle className="mb-2">
                                <Badge className="float-left" variant="secondary">{language}</Badge>
                            </Card.Subtitle>
                        </div>
                        <Card.Text as="h6" className="result-stars">
                            <div><i className="bi bi-star-fill"></i>&nbsp;{stargazers_count}</div>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default Repo;
