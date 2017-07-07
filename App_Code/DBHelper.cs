using System;
using System.Collections.Generic;
using System.Text;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
    public class SQLHelper
    {
      
        //�����ַ���
        static string strConn = ConfigurationManager.ConnectionStrings["conn"].ToString();

       
        
        #region ִ�в�ѯ������DataTable����-----------------------



        public static DataTable GetTable(string strSQL)
        {
            return GetTable(strSQL, null);
        }
        public static DataTable GetTable(string strSQL, SqlParameter[] pas)
        {
            return GetTable(strSQL, pas, CommandType.Text);
        }
        /// <summary>
        /// ִ�в�ѯ������DataTable����
        /// </summary>
        /// <param name="strSQL">sql���</param>
        /// <param name="pas">��������</param>
        /// <param name="cmdtype">Command����</param>
        /// <returns>DataTable����</returns>
        public static DataTable GetTable(string strSQL, SqlParameter[] pas, CommandType cmdtype)
        {
            DataTable dt = new DataTable(); ;
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlDataAdapter da = new SqlDataAdapter(strSQL, conn);
                da.SelectCommand.CommandType = cmdtype;
                if (pas != null)
                {
                    da.SelectCommand.Parameters.AddRange(pas);
                }
                da.Fill(dt);
            }
            return dt;
        } 



        #endregion




        #region ִ�в�ѯ������DataSet����-------------------------




        public static DataSet GetDataSet(string strSQL)
        {
            return GetDataSet(strSQL,null);
        }

        public static DataSet GetDataSet(string strSQL, SqlParameter[] pas)
        { 
           return GetDataSet(strSQL,pas,CommandType.Text);
        }
        /// <summary>
        /// ִ�в�ѯ������DataSet����
        /// </summary>
        /// <param name="strSQL">sql���</param>
        /// <param name="pas">��������</param>
        /// <param name="cmdtype">Command����</param>
        /// <returns>DataSet����</returns>
        public static DataSet GetDataSet(string strSQL, SqlParameter[] pas, CommandType cmdtype)
        {
            DataSet dt = new DataSet(); ;
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlDataAdapter da = new SqlDataAdapter(strSQL, conn);
                da.SelectCommand.CommandType = cmdtype;
                if (pas != null)
                {
                    da.SelectCommand.Parameters.AddRange(pas);
                }
                da.Fill(dt);
            }
            return dt;
        } 
        #endregion





        #region ִ�зǲ�ѯ�洢���̺�SQL���-----------------------------




        public static int ExcuteProc(string ProcName)
        {
            return ExcuteSQL(ProcName, null, CommandType.StoredProcedure);
        }

        public static int ExcuteProc(string ProcName, SqlParameter[] pars)
        {
            return ExcuteSQL(ProcName, pars, CommandType.StoredProcedure);
        }

        public static int ExcuteSQL(string strSQL)
        {
            return ExcuteSQL(strSQL, null);
        }

        public static int ExcuteSQL(string strSQL, SqlParameter[] paras)
        {
            return ExcuteSQL(strSQL, paras, CommandType.Text);
        }

        /// ִ�зǲ�ѯ�洢���̺�SQL���
        /// ����ɾ����
        /// </summary>
        /// <param name="strSQL">Ҫִ�е�SQL���</param>
        /// <param name="paras">�����б���û�в�������null</param>
        /// <param name="cmdType">Command����</param>
        /// <returns>����Ӱ������</returns>
        public static int ExcuteSQL(string strSQL, SqlParameter[] paras, CommandType cmdType)
        {
            int i = 0;
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = new SqlCommand(strSQL, conn);
                cmd.CommandType = cmdType;
                if (paras != null)
                {
                    cmd.Parameters.AddRange(paras);
                }
                conn.Open();
                i = cmd.ExecuteNonQuery();
                conn.Close();
            }
            return i;

        } 


        #endregion








        #region ִ�в�ѯ���ص�һ�У���һ��---------------------------------




        public static int ExcuteScalarSQL(string strSQL)
        {
            return ExcuteScalarSQL(strSQL, null);
        }

        public static int ExcuteScalarSQL(string strSQL, SqlParameter[] paras)
        {
            return ExcuteScalarSQL(strSQL, paras, CommandType.Text);
        }
        public static int ExcuteScalarProc(string strSQL, SqlParameter[] paras)
        {
            return ExcuteScalarSQL(strSQL, paras, CommandType.StoredProcedure);
        }
        /// <summary>
        /// ִ��SQL��䣬���ص�һ�У���һ��
        /// </summary>
        /// <param name="strSQL">Ҫִ�е�SQL���</param>
        /// <param name="paras">�����б���û�в�������null</param>
        /// <returns>����Ӱ������</returns>
        public static int ExcuteScalarSQL(string strSQL, SqlParameter[] paras, CommandType cmdType)
        {
            int i = 0;
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = new SqlCommand(strSQL, conn);
                cmd.CommandType = cmdType;
                if (paras != null)
                {
                    cmd.Parameters.AddRange(paras);
                }
                conn.Open();
                i =Convert.ToInt32( cmd.ExecuteScalar());
                conn.Close();
            }
            return i;

        }


        #endregion









        #region ��ѯ��ȡ����ֵ------------------------------------




        /// <summary>
        /// ���ò��������Ĵ洢���̻�ȡ����ֵ
        /// </summary>
        /// <param name="ProcName"></param>
        /// <returns></returns>
        public static object GetObjectByProc(string ProcName)
        {
            return GetObjectByProc(ProcName, null);
        }
        /// <summary>
        /// ���ô������Ĵ洢���̻�ȡ����ֵ
        /// </summary>
        /// <param name="ProcName"></param>
        /// <param name="paras"></param>
        /// <returns></returns>
        public static object GetObjectByProc(string ProcName, SqlParameter[] paras)
        {
            return GetObject(ProcName, paras, CommandType.StoredProcedure);
        }
        /// <summary>
        /// ����sql����ȡ����ֵ
        /// </summary>
        /// <param name="strSQL"></param>
        /// <returns></returns>
        public static object GetObject(string strSQL)
        {
            return GetObject(strSQL,null);
        }
        /// <summary>
        /// ����sql��� �� ���������ȡ����ֵ
        /// </summary>
        /// <param name="strSQL"></param>
        /// <param name="paras"></param>
        /// <returns></returns>
        public static object GetObject(string strSQL, SqlParameter[] paras)
        {
            return GetObject(strSQL, paras, CommandType.Text);
        }

        /// <summary>
        /// ִ��SQL��䣬������������
        /// </summary>
        /// <param name="strSQL">Ҫִ�е�SQL���</param>
        /// <param name="paras">�����б���û�в�������null</param>
        /// <returns>���ص���������</returns>
        public static object GetObject(string strSQL, SqlParameter[] paras,CommandType cmdtype)
        {
            object o = null;
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = new SqlCommand(strSQL, conn);
                cmd.CommandType = cmdtype;
                if (paras != null)
                {
                    cmd.Parameters.AddRange(paras);
             
                }
           
                conn.Open();
                o = cmd.ExecuteScalar();
                conn.Close();
            }
            return o;

        }



        #endregion





        #region ��ѯ��ȡDataReader------------------------------------




        /// <summary>
        /// ���ò��������Ĵ洢���̣�����DataReader����
        /// </summary>
        /// <param name="procName">�洢��������</param>
        /// <returns>DataReader����</returns>
        public static SqlDataReader GetReaderByProc(string procName)
        {
            return GetReaderByProc(procName, null);
        }
        /// <summary>
        /// ���ô��в����Ĵ洢���̣�����DataReader����
        /// </summary>
        /// <param name="procName">�洢������</param>
        /// <param name="paras">��������</param>
        /// <returns>DataReader����</returns>
        public static SqlDataReader GetReaderByProc(string procName, SqlParameter[] paras)
        {
            return GetReader(procName, paras, CommandType.StoredProcedure);
        }
        /// <summary>
        /// ����sql��䷵��DataReader����
        /// </summary>
        /// <param name="strSQL">sql���</param>
        /// <returns>DataReader����</returns>
        public static SqlDataReader GetReader(string strSQL)
        {
            return GetReader(strSQL, null);
        }
        /// <summary>
        /// ����sql���Ͳ�������DataReader����
        /// </summary>
        /// <param name="strSQL">sql���</param>
        /// <param name="paras">��������</param>
        /// <returns>DataReader����</returns>
        public static SqlDataReader GetReader(string strSQL, SqlParameter[] paras)
        {
           return GetReader(strSQL, paras, CommandType.Text);
        }
        /// <summary>
        /// ��ѯSQL����ȡDataReader
        /// </summary>
        /// <param name="strSQL">��ѯ��SQL���</param>
        /// <param name="paras">�����б���û�в�������null</param>
        /// <returns>��ѯ����DataReader���رոö����ʱ���Զ��ر����ӣ�</returns>
        public static SqlDataReader GetReader(string strSQL, SqlParameter[] paras,CommandType cmdtype)
        {
            SqlDataReader sqldr = null;
            SqlConnection conn = new SqlConnection(strConn);
            SqlCommand cmd = new SqlCommand(strSQL, conn);
            cmd.CommandType = cmdtype;
            if (paras != null)
            {
                cmd.Parameters.AddRange(paras);
            }
            conn.Open();
            //CommandBehavior.CloseConnection�����������������DataReader����رգ��������Զ��ر�
            sqldr = cmd.ExecuteReader(CommandBehavior.CloseConnection);            
            return sqldr;
        }



        #endregion




        #region ������������---------------------------------------------




        /// <summary>
        /// �����ݿ���������������
        /// </summary>
        /// <param name="sourceDt">����Դ��</param>
        /// <param name="targetTable">��������Ŀ���</param>
        public static void BulkToDB(DataTable sourceDt, string targetTable)
        {
            SqlConnection conn = new SqlConnection(strConn);
            SqlBulkCopy bulkCopy = new SqlBulkCopy(conn);   //������Դ��������Ч��������sql server����
            bulkCopy.DestinationTableName = targetTable;    //��������Ŀ���������
            bulkCopy.BatchSize = sourceDt.Rows.Count;   //ÿһ�����е�����
  
            try  
            {
                conn.Open();
                if (sourceDt != null && sourceDt.Rows.Count != 0)
                    bulkCopy.WriteToServer(sourceDt);   //���ṩ������Դ�е������и��Ƶ�Ŀ�����
            }   
            catch (Exception ex)   
            {   
                throw ex;   
            }   
            finally  
            {
                conn.Close();   
                if (bulkCopy != null)   
                    bulkCopy.Close();   
            }   
        
        }

        #endregion


    }