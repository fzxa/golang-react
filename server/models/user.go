package models

import (
	"time"
	db "develops.nebulas.io/server/service"
)

//PlatformUser struct
type PlatformUser struct {
	ID        		int     `json:"id" form:"id"`
	UserName 		string 	`json:"username" form:"username"`
	PassWordHash 	string  `json:"password_hash" form:"password_hash"`
	CreateTime  	time.Time  	`json:"create_time" form:"create_time"`
	Deleted			int 	`json:"deleted" form:"deleted"`
}

// GetUser return one result
func (u *PlatformUser) GetUser()(user PlatformUser,err error) {

	err = db.SqlDB.QueryRow("SELECT id, username, password_hash, create_time , deleted FROM platform_user WHERE username=? AND password_hash=?", u.UserName, u.PassWordHash).Scan(
		&user.ID, &user.UserName, &user.PassWordHash, &user.CreateTime, &user.Deleted,
	)
	return 
}
