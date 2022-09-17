using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class swapDonut : MonoBehaviour
{
    public GameObject fracturedPrefab;
    public float breakForce;
    public WeaponScript donutHoldingScript; 

    // Update is called once per frame
    //void Update()
    //{
    //    if (Input.GetKeyDown("f"))
    //        BreakTheThing();
    //}

    private void OnCollisionEnter(Collision collision)
    {
        if (donutHoldingScript.isThrowed && !collision.collider.CompareTag("Player")){
            BreakTheThing();
        }
            //particleHolder.SetActive(true);
        //}
        
    }
    public void BreakTheThing()
    {
        GameObject frac = Instantiate(fracturedPrefab, transform.position, transform.rotation);
        foreach(Rigidbody rb in frac.GetComponentsInChildren<Rigidbody>())
        {
            Vector3 force = (rb.transform.position = transform.position).normalized * breakForce;
            rb.AddForce(force);
        }
        //replace complete donut with broken one
        Destroy(gameObject);
    } 
}
