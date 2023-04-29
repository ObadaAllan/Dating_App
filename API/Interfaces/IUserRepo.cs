using API.DTOs;
using API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserRepo
    {
        void UpdateUsers(AppUser user);

        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetAllUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUserNameAsync(string Username);

        Task<IEnumerable<MemberDto>> GetMemberAsync();
        Task<MemberDto> GetMemberByNameAsync(string useranem);

    }
}
