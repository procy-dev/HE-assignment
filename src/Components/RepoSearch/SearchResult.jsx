import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Repo = ({ repo }) => {
    const { name, created_at, stargazers_count, owner, id } = repo;

    return (
        <Link className="repo-link mb-2" to={{ pathname: `/details/${id}`, state: { repo: repo } }}>
            <Card className="repo-item">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Card.Title>
                                {name} - <span className="text-muted font-weight-light">{owner.login}</span>
                            </Card.Title>
                            <Card.Subtitle className="text-muted mb-2">
                                {new Date(created_at).toLocaleDateString()}
                            </Card.Subtitle>                            
                        </div>
                        <h6 className="result-stars">
                            <div><i className="float-left bi bi-star-fill"></i>&nbsp;{stargazers_count}</div>
                        </h6>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default Repo;
