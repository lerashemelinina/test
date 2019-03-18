using _01_DAL;
using _02_BOL;
using System;
using System.Linq;

namespace _03_BLL
{
    public class UserManager
    {

        static public UserModel SelectByUserNameAndPassword(string userName, string password)
        {
            try
            {
                using (UserDbEntities ef = new UserDbEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.UserName == userName
                                                                           &&dbUser.Password == password);

                    if (selectedUser == null)
                        return null;

                    return new UserModel
                    {
                        UserName = selectedUser.UserName,
                        Email = selectedUser.Email,
                        Password = selectedUser.Password
                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }



        static public bool AddNewUser(UserModel newUser)
        {
            try
            {

                using (UserDbEntities ef = new UserDbEntities())
                {

                    User newDbUser = new User
                    {
                       UserName= newUser.UserName,
                       Email=newUser.Email,
                       Password=newUser.Password
                    };

                    ef.Users.Add(newDbUser);
                    ef.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
