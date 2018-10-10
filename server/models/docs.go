package models

import (
	"time"
	db "develops.nebulas.io/server/service"
)

//PlatformDocs struct
type PlatformDocs struct {
	ID        	int     `json:"id" form:"id"`
	Title 		string 	`json:"title" form:"title"`
	TitleURL  	string  `json:"title_url" form:"title_url"`
	Content 	string  `json:"content" form:"content"`
	CategoryID	int 	`json:"category_id" form:"category_id"`
	CreateTime  time.Time  	`json:"create_time" form:"create_time"`
}

// GetDocs return one result
func (d *PlatformDocs) GetDocs()(docs PlatformDocs,err error) {

	err = db.SqlDB.QueryRow("SELECT id, title, title_url, content FROM platform_docs WHERE title_url=?", d.TitleURL).Scan(
		&docs.ID, &docs.Title, &docs.TitleURL, &docs.Content,
	)
	return 
}

// UpdateDocs update
func (d *PlatformDocs) UpdateDocs()(ra int64, err error) {

	stmt ,_ := db.SqlDB.Prepare("UPDATE `platform_docs` SET content=?,title=?,title_url=? WHERE id=?")
	defer stmt.Close()
	rs, err := stmt.Exec(d.Content, d.Title, d.TitleURL, d.ID)
	if err != nil {
		return
	}

	ra, err = rs.RowsAffected()
	return
}

// CreateDocs create
func (d *PlatformDocs) CreateDocs()(id int64, err error) {
	//rs, err := db.Exec("INSERT INTO platform_docs(title, title_url,content,create_time,category_id) VALUES (?, ?, ?, ?, ?)", Title, TitleURL, Content, CreateTime,CategoryID)

	rs ,err := db.SqlDB.Exec("INSERT INTO platform_docs(title, title_url,content,create_time,category_id) VALUES (?, ?, ?, ?, ?)", d.Title, d.TitleURL, d.Content, d.CreateTime, d.CategoryID)
	if err != nil {
		return
	}
	id, err = rs.LastInsertId()
	return
}
