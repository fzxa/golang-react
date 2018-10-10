package handlers

import (
	"encoding/hex"
	"fmt"
	"net/http"
	"crypto/sha1"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	. "develops.nebulas.io/server/models"
)

func Login(c *gin.Context) {
	UserName := c.Query("username")
	PassWord := c.Query("password")

	h := sha1.New()
	h.Write([]byte(PassWord))
	PassWordSrc := h.Sum(nil)
	PassWordHash := hex.EncodeToString(PassWordSrc)
	fmt.Printf("username is %s ", UserName)
	fmt.Printf("password_hash is %s ", PassWordHash)
	User := PlatformUser{UserName:UserName, PassWordHash: PassWordHash}
	
	row, err := User.GetUser()
	fmt.Printf("user is %v", User)
	if err == nil  || row.ID == 0{
		c.JSON(http.StatusOK, gin.H{
			"code" : 10002,
			"msg" : "The password you’ve entered is incorrect",
			"data": "",
		})
	} else {
		session := sessions.Default(c)
	
		session.Set("user", row.UserName)
		session.Save()
	
		c.JSON(http.StatusOK, gin.H{
			"code" : 0,
			"msg" : "success",
			"data": row.UserName,
		})
	}
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete("user")
	session.Save()
	c.JSON(http.StatusOK, gin.H{
		"code" : 0,
		"msg" : "success",
		"data": "",
	})
}

func CheckLogin(c *gin.Context) {
	session := sessions.Default(c)

	user := session.Get("user")
	
	if user == nil {
		c.JSON(http.StatusOK, gin.H{
			"code" 	: 10001,
			"msg"	: "Permission denied",
			"data" 	: "",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code" 	: 0,
			"msg"	: "success",
			"data" 	: "",
		})
	}

	
}