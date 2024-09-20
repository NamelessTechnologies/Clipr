using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ConversationController : ControllerBase
{
    private NpgsqlConnection conn;

    public ConversationController(){
        conn = DBConn.Instance().getConn();
    }

    
    
}
