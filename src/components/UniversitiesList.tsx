import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import UniversityDataService from '../services/UniversityService';
import IUniversityData from '../types/University';

const UniversitiesList: React.FC = () => {
  const [universities, setUniversities] = useState<Array<IUniversityData>>([]);
  const [searchQuery, setSearchTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    retrieveUniversities();
  }, []);

  const onChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTitle(searchQuery);
  };

  const retrieveUniversities = () => {
    setLoading(true);
    UniversityDataService.getAll()
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const search = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      UniversityDataService.search(searchQuery)
        .then((response) => {
          setUniversities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h1>Universities List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or country"
            value={searchQuery}
            onChange={onChangeSearchQuery}
            onKeyPress={search}
          />
        </div>
      </div>
      <div className="col-md-8">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border my-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">University</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {universities &&
                universities.map((university, uindex) => (
                  <tr key={uindex}>
                    <td>
                      <p className="fw-bold">{university.name}</p>
                      {university.web_pages.map((web_page, index) => (
                        <p className="my-0 py-0" key={index}>
                          <a
                            href={web_page}
                            className="card-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {web_page}
                          </a>
                        </p>
                      ))}
                    </td>
                    <td>{university.country}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UniversitiesList;
